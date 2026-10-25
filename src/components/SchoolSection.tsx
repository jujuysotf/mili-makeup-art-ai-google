import React from 'react';
import { SCHOOL_COURSES } from '../data/content';
import { SchoolCourse } from '../types';
import { getCourseInquiryUrl } from '../utils/whatsapp';
import {
  GraduationCap,
  Clock,
  CheckCircle,
  Calendar,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface SchoolSectionProps {
  onBookCourse: (course: SchoolCourse) => void;
}

export const SchoolSection: React.FC<SchoolSectionProps> = ({ onBookCourse }) => {
  return (
    <section id="escuela" className="py-20 lg:py-28 bg-[#FBF4F6]/80 border-t border-b border-[#E7D5DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D5DB] text-xs font-semibold text-[#1A1A1A] mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#F4A7C1]" />
            <span>Formación & Academia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
            Escuela Milimakeupart
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5C5558]">
            Clases individuales y personalizadas para aprender a maquillarte sola o perfeccionar técnicas de alta duración sobre modelos reales.
          </p>
        </div>

        {/* Grilla de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCHOOL_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-7 border border-[#E7D5DB] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-2xl bg-[#FBF4F6] text-[#1A1A1A] border border-[#E7D5DB]">
                    <Sparkles className="w-5 h-5 text-[#F4A7C1]" />
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#5C5558]">
                    <Clock className="w-3.5 h-3.5 text-[#F4A7C1]" />
                    {course.durationMinutes} minutos
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-[#5C5558] italic">
                  {course.target}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-[#5C5558] leading-relaxed">
                  {course.summary}
                </p>

                {/* Temas */}
                <div className="mt-6 pt-5 border-t border-[#E7D5DB]/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-3">
                    Temario práctico:
                  </span>
                  <ul className="space-y-2">
                    {course.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#5C5558]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#F4A7C1] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-8 pt-5 border-t border-[#E7D5DB]/60 flex flex-col gap-2.5">
                <button
                  onClick={() => onBookCourse(course)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#F4A7C1] hover:text-[#1A1A1A] transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservar clase individual</span>
                </button>

                <a
                  href={getCourseInquiryUrl(course.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-[#5C5558] hover:text-[#1A1A1A] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Consultar temario por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
