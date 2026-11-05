import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { CLINIC_INFO } from '../data/clinicInfo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= CLINIC_INFO.delivery.freeDeliveryThreshold;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : CLINIC_INFO.delivery.flatRate;
  const total = subtotal + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, CLINIC_INFO.delivery.freeDeliveryThreshold - subtotal);

  const directWhatsAppOrder = () => {
    if (items.length === 0) return;
    const itemList = items
      .map((it) => `• ${it.product.name} (Qty: ${it.quantity}) - Rs. ${(it.product.price * it.quantity).toLocaleString()}`)
      .join('\n');

    const msg = `Assalam-o-Alaikum Dr. M Zargham Ghaffar,
I would like to order the following medicines from Sultan Homeopathic Clinic website:

${itemList}

Subtotal: Rs. ${subtotal.toLocaleString()}
Delivery: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
Total Amount: Rs. ${total.toLocaleString()}

Please confirm availability and dispatch to my address.`;

    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              Shopping Cart ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/70 text-stone-600 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-950">
          {isFreeShipping ? (
            <div className="flex items-center gap-2 font-semibold text-emerald-800">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>You have unlocked FREE Nationwide Delivery across Pakistan!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-stone-700">
                <span>Add <strong>Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for FREE delivery</span>
                <span className="font-bold tabular-nums">
                  {Math.round((subtotal / CLINIC_INFO.delivery.freeDeliveryThreshold) * 100)}%
                </span>
              </div>
              <div className="w-full bg-emerald-200/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-700 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / CLINIC_INFO.delivery.freeDeliveryThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-stone-700 font-medium">Your shopping bag is currently empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our specialized 10-day and 15-day courses, herbal hair oils, or medicated acne soaps.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
              >
                Browse Medicines & Courses
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 p-3 rounded-xl border border-stone-200 bg-white hover:border-emerald-200 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-stone-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Nationwide Shipping</span>
                <span className="font-semibold tabular-nums text-emerald-800">
                  {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total Amount</span>
                <span className="tabular-nums text-base text-emerald-900">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-800 hover:bg-emerald-700 active:scale-98 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={directWhatsAppOrder}
                className="w-full py-3 px-4 text-xs font-semibold text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Quick WhatsApp 1-Click Order</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cash on Delivery (COD) · Discreet Parcel Packaging</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
