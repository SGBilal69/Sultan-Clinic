import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Truck, Check, MessageCircle, Clock, HeartHandshake } from 'lucide-react';
import { Product } from '../types';
import { CLINIC_INFO } from '../data/clinicInfo';
import { ProductVisual } from './ProductVisual';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Dr. M Zargham Ghaffar, I want to order "${product.name}" (Qty: ${quantity}, Total: Rs. ${
      product.price * quantity
    }). Please arrange delivery.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Product Image & Highlights */}
          <div className="md:col-span-5 bg-stone-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-xs">
                <ProductVisual product={product} size="lg" />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>Nationwide Cash on Delivery (COD)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% Genuine Imported Homeopathic Potency</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <HeartHandshake className="w-4 h-4 text-emerald-700" />
                  <span>Physician Consultation & Follow-up Included</span>
                </div>
              </div>
            </div>

            {product.durationDays && (
              <div className="mt-6 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-semibold">Course Duration:</span>
                <span className="font-bold">{product.durationDays} Days</span>
              </div>
            )}
          </div>

          {/* Right Column: Information, Dosage, Pricing & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs uppercase font-semibold text-emerald-800 tracking-wider mb-1">
                {product.category.replace('_', ' ')}
              </div>
              <h2 className="font-display text-2xl font-bold text-stone-900">
                {product.name}
              </h2>
              {product.urduName && (
                <p className="text-sm font-medium text-emerald-900/80 font-sans mt-0.5" dir="rtl">
                  {product.urduName}
                </p>
              )}
            </div>

            {/* Price Block */}
            <div className="flex items-baseline gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="font-display text-2xl font-bold text-stone-900 tabular-nums">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.dailyCost && (
                <span className="text-xs font-semibold text-emerald-800 ml-auto bg-emerald-100/70 px-2.5 py-1 rounded-md">
                  ~Rs. {product.dailyCost} per day
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Clinical Benefits:
              </h4>
              <ul className="text-xs text-stone-600 space-y-1.5">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dosage & Ingredients */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Recommended Dosage / Usage:</span>
                <p className="text-stone-600">{product.dosage}</p>
              </div>

              <div className="text-stone-500">
                <span className="font-semibold text-stone-700">Classical Composition:</span>{' '}
                {product.ingredients}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="pt-4 border-t border-stone-200 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-500 tabular-nums ml-auto">
                  Subtotal: <strong className="text-stone-900">Rs. {(product.price * quantity).toLocaleString()}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
