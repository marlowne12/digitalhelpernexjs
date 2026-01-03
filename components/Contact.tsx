import React, { useState } from 'react';
import { Mail, Loader2, Sparkles, MapPin, Phone, ExternalLink, AlertCircle } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});
  const [touched, setTouched] = useState<{name?: boolean; email?: boolean; message?: boolean}>({});
  
  const [isDrafting, setIsDrafting] = useState(false);
  const [sent, setSent] = useState(false);

  const validateField = (name: string, value: string): string => {
    if (name === 'name') {
      if (!value.trim()) return 'Name is required';
      if (value.length < 2) return 'Name is too short';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    }
    if (name === 'message') {
      if (!value.trim()) return 'Message is required';
      if (value.length < 10) return 'Message must be at least 10 characters';
    }
    return '';
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field as string, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Immediate feedback if the field has already been touched/visited
    if (touched[field]) {
      const error = validateField(field as string, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    } else if (errors[field]) {
       // Also clear error if user starts correcting before blur
       const error = validateField(field as string, value);
       setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleDraftAI = async () => {
    // Validate name is present for context
    if (!formData.name) {
        setTouched(prev => ({ ...prev, name: true }));
        setErrors(prev => ({ ...prev, name: 'Name is required for AI drafting' }));
        return;
    }
    
    // Validate message has at least some keywords
    if (!formData.message) {
        setTouched(prev => ({ ...prev, message: true }));
        setErrors(prev => ({ ...prev, message: 'Please enter a topic or keywords for the AI to draft from' }));
        return;
    }

    setIsDrafting(true);
    try {
        const draft = await geminiService.generateEmailDraft(formData.message, formData.name);
        setFormData(prev => ({ ...prev, message: draft }));
        // Re-validate message after AI generation to clear any length errors
        setErrors(prev => ({ ...prev, message: '' }));
    } catch (e) {
        console.error(e);
    } finally {
        setIsDrafting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);

    setErrors({
      name: nameError || undefined,
      email: emailError || undefined,
      message: messageError || undefined
    });
    setTouched({ name: true, email: true, message: true });

    if (nameError || emailError || messageError) return;

    setSent(true);
    // Simulate sending
    setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
        setSent(false);
        alert("Message sent! (Simulation)");
    }, 2000);
  };

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden" id="contact">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-900/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Let's Build the Future
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Ready to elevate your digital presence? Integrate with Google services, automate with AI, and look good doing it.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-cyan-400 group-hover:bg-cyan-900/20 group-hover:border-cyan-500/50 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">Email Us</h4>
                  <p className="text-slate-500">hello@digitalhelper.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-purple-400 group-hover:bg-purple-900/20 group-hover:border-purple-500/50 transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-purple-400 transition-colors">Visit Us</h4>
                  <div className="text-slate-500 flex flex-col items-start">
                    <p>Richland, Washington</p>
                    <a 
                      href="https://maps.app.goo.gl/A7Wc6ehVz5hnE84v5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 text-xs flex items-center gap-1 hover:underline mt-1"
                    >
                      View on Google Maps <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-pink-400 group-hover:bg-pink-900/20 group-hover:border-pink-500/50 transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-pink-400 transition-colors">Call Us</h4>
                  <p className="text-slate-500">+1 (509) 555-0123</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                <div className="relative">
                    <input 
                    type="text"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full bg-slate-950 border ${errors.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:ring-purple-500'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="John Doe"
                    />
                    {errors.name && <AlertCircle className="absolute right-3 top-3 text-red-500" size={18} />}
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1 animate-fade-in">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <div className="relative">
                    <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:ring-purple-500'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="john@example.com"
                    />
                    {errors.email && <AlertCircle className="absolute right-3 top-3 text-red-500" size={18} />}
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 animate-fade-in">{errors.email}</p>}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-400">Message</label>
                    <button 
                        type="button"
                        onClick={handleDraftAI}
                        disabled={isDrafting}
                        className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 disabled:opacity-30 transition-colors"
                    >
                        <Sparkles size={12} />
                        {isDrafting ? 'Drafting...' : 'AI Auto-Draft'}
                    </button>
                </div>
                <div className="relative">
                    <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={e => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    className={`w-full bg-slate-950 border ${errors.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:ring-purple-500'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all resize-none`}
                    placeholder="Tell us about your project... (Click AI Auto-Draft for help)"
                    />
                </div>
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1 animate-fade-in">{errors.message}</p>}
              </div>

              <button 
                type="submit"
                disabled={sent || isDrafting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {sent ? (
                    <>Sent Successfully!</>
                ) : isDrafting ? (
                    <><Loader2 className="animate-spin" size={18} /> Generating...</>
                ) : (
                    <>Send Message <Mail size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};