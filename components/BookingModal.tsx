import { X, CreditCard, Calendar, MapPin, Check, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { EventProps } from './EventCard';

interface BookingModalProps {
  event: EventProps | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (event: EventProps) => void;
}

export default function BookingModal({ event, isOpen, onClose, onSuccess }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !event) return null;

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      onSuccess(event);
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    setStep('details');
    setQuantity(1);
  };

  const totalPrice = typeof event.price === 'number' ? event.price * quantity : event.price;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 text-gray-400"
        >
          <X size={20} />
        </button>

        {/* Left Side: Event Info */}
        <div className="w-full md:w-5/12 bg-[#d4af37] text-white p-8 flex flex-col justify-between">
          <div>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              {event.category}
            </span>
            <h2 className="font-display text-3xl font-bold mb-6 leading-tight">
              {event.title}
            </h2>
            <div className="space-y-4 text-white/80 text-sm">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-white" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-white" />
                <span className="line-clamp-2 font-medium">{event.location}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Total ({quantity}x)</span>
                <span className="text-3xl font-display font-bold text-white">
                  {typeof totalPrice === 'number' ? `$${totalPrice}` : totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Steps */}
        <div className="w-full md:w-7/12 p-8 bg-white">
          {step === 'details' && (
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Booking Details</h3>
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">Ticket Quantity</label>
                  <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100 w-fit">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-100 hover:text-[#d4af37] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-100 hover:text-[#d4af37] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">Full Name</label>
                  <input type="text" placeholder="Enter your name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:outline-none focus:border-[#d4af37] transition-all text-sm" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">Email Address</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:outline-none focus:border-[#d4af37] transition-all text-sm" />
                </div>
              </div>
              <button 
                onClick={() => setStep('payment')}
                className="btn-primary w-full mt-8"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Payment Method</h3>
              <div className="space-y-4 flex-grow">
                <div className="p-4 rounded-xl border-2 border-[#d4af37] bg-[#d4af37]/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-[#d4af37]" />
                    <span className="font-bold text-xs tracking-widest uppercase">Credit Card</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                  </div>
                </div>
                <div className="pt-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:outline-none focus:border-[#d4af37] transition-all text-sm" />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep('details')} className="px-6 py-3 rounded-xl font-bold border border-gray-100 hover:bg-gray-50 transition-all text-[10px] uppercase tracking-widest text-gray-400">Back</button>
                <button 
                  onClick={handleBook}
                  disabled={loading}
                  className="btn-primary flex-grow"
                >
                  {loading ? 'Processing...' : 'Complete Booking'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-6">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Booking Confirmed!</h3>
              <p className="text-gray-500 mb-8 font-medium text-sm leading-relaxed">Your journey begins. Check your email for the ticket.</p>
              <button 
                onClick={handleClose}
                className="btn-primary w-full"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
