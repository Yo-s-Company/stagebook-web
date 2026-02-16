"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import Link from 'next/link';
import Typewriter from '@/src/components/Typewriter';
import { 
  CalendarIcon, 
  BeakerIcon, 
  PlusIcon, 
  UserGroupIcon, 
  TicketIcon,
  BuildingOfficeIcon,
  BellIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import StatusPopup from '@/src/components/StatusPop';
import ErrorModal from '@/src/components/ErrorModal';

