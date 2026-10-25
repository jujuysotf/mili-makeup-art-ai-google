import React, { useState } from 'react';
import { SCHOOL_COURSES } from '../data/content';
import { SchoolCourse } from '../types';
import { getCourseInquiryUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  GraduationCap,
  Clock,
  CheckCircle,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SchoolSectionProps {
  onBookCourse: (course: SchoolCourse) => void;
}

export const SchoolSection: React.FC<SchoolSectionProps> = ({ onBookCourse }) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleTopics = (id: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="escuela"
      data-sector="SECTOR 6: Escuela de Maquillaje"
      className="py-16 sm:py-24 bg-[#FBF4F6]/80 border-t border-b border-[#E7D5DB] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Formación & Academia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Escuela Milimakeupart
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5C5558] max-w-xl mx-auto">
            Clases individuales personalizadas para aprender a maquillarte sola o perfeccionar técnicas de noche sobre tu propio rostro.
          </p>
        </div>

        {/* Grilla / Carrusel Deslizable en Móvil */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory">
          {SCHOOL_COURSES.map((course) => {
            const isExpanded = !!expandedTopics[course.id];

            return (
              <div
                key={course.id}
                className="min-w-[85%] sm:min-w-0 bg-white rounded-3xl p-5 sm:p-6 border border-[#E7D5DB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between snap-center shrink-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#FBF4F6] text-[#1A1A1A] border border-[#E7D5DB]">
                      <Sparkles className="w-4 h-4 text-[#F4A7C1]" />
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold bg-[#FBF4F6] px-2.5 py-1 rounded-full text-[#1A1A1A]">
                      <Clock className="w-3.5 h-3.5 text-[#F4A7C1]" />
                      {course.durationMinutes} min
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#5C5558] italic line-clamp-1">
                    {course.target}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-[#5C5558] leading-relaxed line-clamp-2">
                    {course.summary}
                  </p>

                  {/* Toggle Temario para no sobrecargar de texto */}
                  <div className="mt-3 pt-2 border-t border-[#E7D5DB]/60">
                    <button
                      onClick={() => toggleTopics(course.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] hover:text-[#F4A7C1] transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Ocultar temario' : 'Ver temario del curso'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#F4A7C1]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#F4A7C1]" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 pt-2 border-t border-[#E7D5DB]/60 space-y-1.5 animate-fade-in bg-[#FBF4F6]/50 p-3 rounded-2xl">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block">
                          Temario práctico:
                        </span>
                        <ul className="space-y-1">
                          {course.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-[#5C5558]">
                              <CheckCircle className="w-3.5 h-3.5 text-[#F4A7C1] shrink-0 mt-0.5" />
                              <span className="leading-snug">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="mt-5 pt-4 border-t border-[#E7D5DB]/60 flex flex-col gap-2">
                  <button
                    onClick={() => onBookCourse(course)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reservar clase individual</span>
                  </button>

                  <a
                    href={getCourseInquiryUrl(course.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-[#5C5558] hover:text-[#1A1A1A] transition-colors font-medium"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="sm:hidden text-center text-xs text-[#5C5558] mt-2">
          ← Deslizá para ver todos los cursos →
        </p>
      </div>
    </section>
  );
};
