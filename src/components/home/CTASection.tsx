import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '../../lib/ToastContext';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Tell us more'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CTASection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addToast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In production, configure VITE_API_URL in your hosting platform (Vercel, Netlify)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
        addToast("Data transmission complete.", "success");
      } else {
        addToast("System offline. Please try again.", "error");
      }
    } catch (error) {
      console.error(error);
      addToast("Server unreachable.", "error");
    }
  };

  const inputClass = "w-full bg-transparent border-b border-border text-white px-0 py-4 font-body text-xl focus:outline-none focus:border-accent-cyan transition-colors placeholder:text-text-muted/50";

  return (
    <section className="relative w-full min-h-screen bg-bg flex items-center justify-center overflow-hidden z-0">

      {/* Background Grid (Bookend to Hero) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.15) 1px, transparent 1px)', backgroundSize: '100px 100px', transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5)' }} />
      </div>

      {/* Amber Glow Orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent-amber rounded-full blur-[150px] mix-blend-screen pointer-events-none -z-10"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col items-center">

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="cta-text"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
              className="w-full cursor-pointer group"
              onClick={() => setIsExpanded(true)}
            >
              <h2 className="font-display text-[12vw] md:text-[8vw] lg:text-[6vw] tracking-tight leading-none text-white text-center hover:text-accent-cyan transition-colors duration-500 w-full whitespace-nowrap">
                START YOUR PROJECT <span className="inline-block group-hover:translate-x-8 transition-transform duration-500">&rarr;</span>
              </h2>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="font-code text-accent-amber text-6xl mb-8 font-bold animate-pulse">{'{ }'}</div>
              <h3 className="font-display text-5xl md:text-7xl text-white mb-4">SYSTEMS ENGAGED</h3>
              <p className="font-code text-text-muted">Awaiting connection protocol from DevNest HQ.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="w-full max-w-3xl bg-surface/50 backdrop-blur-xl border border-border p-12 rounded-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="font-display text-4xl text-white">INITIALIZE PROJECT</h3>
                <button onClick={() => setIsExpanded(false)} className="font-code text-text-muted hover:text-white transition-colors">
                  [X] ABORT
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <input {...register('fullName')} placeholder="What is your designation? (Name)" className={inputClass} autoFocus />
                  {errors.fullName && <p className="text-accent-amber mt-2 font-code text-xs">{errors.fullName.message}</p>}
                </div>
                <div>
                  <input {...register('email')} placeholder="Communication channel? (Email)" className={inputClass} />
                  {errors.email && <p className="text-accent-amber mt-2 font-code text-xs">{errors.email.message}</p>}
                </div>
                <div>
                  <textarea {...register('message')} rows={3} placeholder="Define the operational parameters... (Project Scope)" className={`${inputClass} resize-none`} />
                  {errors.message && <p className="text-accent-amber mt-2 font-code text-xs">{errors.message.message}</p>}
                </div>

                <div className="pt-8">
                  <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-white text-black font-display text-3xl hover:bg-accent-cyan transition-colors disabled:opacity-50">
                    {isSubmitting ? 'TRANSMITTING...' : 'EXECUTE'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
