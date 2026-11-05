import React, { useState, useMemo } from 'react';
import { ShoppingBag, Eye, Check, Star, MessageCircle, Sparkles, Filter } from 'lucide-react';
import { CLINIC_PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { CLINIC_INFO } from '../data/clinicInfo';
import { ProductVisual } from './ProductVisual';

interface StoreSectionProps {
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  onAddToCart,
  onOpenProductDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Remedies & Courses', value: 'all' },
    { label: 'Featured Clinical Courses', value: 'courses' },
    { label: "Men's Health & Vitality", value: 'mens_health' },
    { label: "Women's Health & Hormones", value: 'womens_health' },
    { label: 'Herbal Skin, Hair & Soaps', value: 'skin_hair' },
    { label: 'Digestive, IBS & Kidneys', value: 'digestive_renal' },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return CLINIC_PRODUCTS;
    return CLINIC_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section id="medicines" className="py-16 lg:py-24 bg-stone-50/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Dispensary & E-Commerce Store</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight text-balance">
            Specialized Courses & Herbal Preparations
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            Handcrafted classical potencies, pure herbal oils, and medicated soaps dispatched directly from Sultan Homeopathic Clinic. Available for nationwide Cash on Delivery (COD) across Pakistan.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid (3 Columns Desktop, 2 Columns Tablet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Top Visual Area */}
                <div>
                  <div className="relative overflow-hidden">
                    <ProductVisual product={product} />

                    {/* Quick View Button */}
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      className="absolute inset-x-4 bottom-4 py-2 px-3 bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 shadow-md hover:bg-white cursor-pointer z-20"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-800" />
                      <span>View Medicine Details & Dosage</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                      <span className="uppercase tracking-wider font-semibold text-[11px] text-emerald-800">
                        {product.category.replace('_', ' ')}
                      </span>
                      {product.volumeOrUnit && (
                        <span className="font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                          {product.volumeOrUnit}
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onOpenProductDetail(product)}
                      className="font-display text-base font-bold text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {product.urduName && (
                      <p className="text-xs text-emerald-950/70 font-sans mt-0.5 line-clamp-1" dir="rtl">
                        {product.urduName}
                      </p>
                    )}

                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Price & Savings Display */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-xl font-bold text-stone-900 tabular-nums">
                          Rs. {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through tabular-nums">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {product.dailyCost && (
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          ~Rs. {product.dailyCost}/day
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAdd(product)}
                    className={`w-full py-2.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Assalam-o-Alaikum Dr. Zargham, I want to order "${product.name}" (Price: Rs. ${product.price}). Please share delivery confirmation.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
