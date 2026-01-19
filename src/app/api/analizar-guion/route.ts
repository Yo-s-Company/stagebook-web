import { NextRequest, NextResponse } from 'next/server';

// Importación estándar
import * as pdfjsLib from 'pdfjs-dist';

// Configuración necesaria para entorno Node.js
import 'pdfjs-dist/build/pdf.worker.mjs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: "No se subió archivo" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Usamos la configuración de datos directamente
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      useSystemFonts: true,
      disableFontFace: true,
    });
    
    const pdfDoc = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    // Tu lógica de conteo > 5
    const lines = fullText.split('\n').map(l => l.trim());
    const personajeRegex = /^([A-ZÁÉÍÓÚÑ\s]{2,25}):/;
    const conteo: Record<string, number> = {};

    lines.forEach(line => {
      const match = line.match(personajeRegex);
      if (match) {
        const nombre = match[1].trim();
        if (nombre.length > 1) {
          conteo[nombre] = (conteo[nombre] || 0) + 1;
        }
      }
    });

    const personajesValidados = Object.entries(conteo)
      .filter(([_, count]) => count >= 5)
      .map(([nombre]) => ({ nombre }));

    return NextResponse.json({
      tituloObra: file.name.replace('.pdf','').toUpperCase(),
      personajes: personajesValidados,
    });

  } catch (error: any) {
    console.error("Error detallado:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}