import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, companyName, token, role } = await req.json();

    // 1. Validar sesión del remitente
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // 2. Enviar el correo con estilo StageBook
    const { data, error } = await resend.emails.send({
      from: 'StageBook <invitaciones@tu-dominio.com>',
      to: email,
      subject: `Invitación oficial: Únete a ${companyName}`,
      html: `
        <div style="background-color: #000; color: #F9F6EE; padding: 40px; font-family: monospace; text-align: center; border: 1px solid #333;">
          <h1 style="color: #dc2626; text-transform: uppercase; letter-spacing: -2px; font-size: 32px;">StageBook</h1>
          <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 5px; color: #555;">Notificación de Reclutamiento</p>
          <hr style="border: 0; border-top: 1px solid #111; margin: 30px 0;">
          <p style="font-size: 14px;">Has sido invitado a formar parte de <strong>${companyName}</strong></p>
          <p style="font-size: 12px; color: #888;">Rol asignado: <span style="color: #dc2626; font-weight: bold;">${role}</span></p>
          <div style="margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/invitaciones/confirmar?token=${token}" 
               style="background-color: #F9F6EE; color: #000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; text-transform: uppercase; font-size: 11px;">
               Aceptar Invitación
            </a>
          </div>
          <p style="font-size: 9px; color: #444; margin-top: 50px;">ESTE ES UN DOCUMENTO DIGITAL OFICIAL DE STAGEBOOK.</p>
        </div>
      `
    });

    if (error) throw error;
    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}