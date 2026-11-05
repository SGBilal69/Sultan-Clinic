import React, { useState, useMemo } from 'react';
import { ShoppingBag, Eye, Check, MessageCircle, Sparkles, Truck, ShieldCheck, Filter, Search } from 'lucide-react';
import { CLINIC_PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { CLINIC_INFO } from '../data/clinicInfo';
import { ProductVisual } from '../components/ProductVisual';
import { useLanguage } from '../context/LanguageContext';

interface MedicinesPageProps {
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const MedicinesPage: React.FC<MedicinesPageProps> = ({
  onAddToCart,
  onOpenProductDetail,
}) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories: { label: string; value: ProductCategory }[] = [
    { label: t('All Products & Courses', 'تمام ادویات و کورسز'), value: 'all' },
    { label: t('Clinical Courses', 'مخصوص کلینیکل کورسز'), value: 'courses' },
    { label: t("Men's Health & Vitality", 'مردانہ طاقت و امراض'), value: 'mens_health' },
    { label: t("Women's Health & Hormones", 'زنانہ امراض و ہارمونز'), value: 'womens_health' },
    { label: t('Herbal Soaps, Oils & Serums', 'ہربل صابن، تیل و سیرم'), value: 'skin_hair' },
    { label: t('Digestive & Renal', 'معدہ، گردہ و پتھری'), value: 'digestive_renal' },
  ];

  const filteredProducts = useMemo(() => {
    return CLINIC_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.urduName && product.urduName.includes(query)) ||
        product.description.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <div className="py-12 lg:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3.5 py-1.5 rounded-md">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t('Official Clinic Dispensary & Pharmacy', 'آفیشل کلینک ڈسپنسری و فارمیسی')}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight text-balance">
            {t('Medicines, Courses & Herbal Remedies', 'مستند ہومیوپیتھک کورسز اور ہربل ادویات')}
          </h1>

          {/* Authentic Nastaliq Urdu Display */}
          <div className="font-urdu text-xl sm:text-2xl text-emerald-950 font-bold leading-loose text-center py-1" dir="rtl">
            سلطان ہومیوپیتھک کلینک کے تصدیق شدہ خصوصی کورسز اور ہربل مصنوعات
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t(
              'Order directly from Sultan Homeopathic Clinic. 100% genuine imported potencies and herbal preparations. Delivered across all cities and villages in Pakistan via Cash on Delivery (COD).',
              'سلطان ہومیوپیتھک کلینک سے براہ راست خالص ادویات حاصل کریں۔ پورے پاکستان کے تمام شہروں اور دیہاتوں میں کیش آن ڈلیوری کی سہولت دستیاب ہے۔'
            )}
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-stone-600">
            <div className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>{t('Free Delivery on orders above Rs. 3,000', '3000 روپے سے زائد کے آرڈر پر مفت ڈلیوری')}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{t('Cash on Delivery (COD) Nationwide', 'پورے پاکستان میں کیش آن ڈلیوری')}</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(
                'Search medicine or course (e.g. Night fall, Saffron oil, Hair loss, Bedwetting, Acne soap)...',
                'دوائی یا کورس کا نام تلاش کریں (مثلاً زعفرانی آئل، بالوں کا گرنا، سوتے میں پیشاب، ایکنی صابن)...'
              )}
              className="w-full pl-12 pr-4 py-3.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-700 px-2 py-1"
              >
                {t('Clear', 'صاف کریں')}
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2">
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
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image / Visual Section */}
                <div>
                  <div className="relative overflow-hidden">
                    <ProductVisual product={product} />

                    {/* Quick View Button */}
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      className="absolute inset-x-4 bottom-4 py-2 px-3 bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 shadow-md hover:bg-white cursor-pointer z-20"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-800" />
                      <span>{t('View Formula & Dosage', 'نسخہ و خوراک دیکھیں')}</span>
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
                      {language === 'ur' && product.urduName ? product.urduName : product.name}
                    </h3>

                    {/* Secondary Name */}
                    {product.urduName && (
                      <div
                        className="font-urdu text-xs text-emerald-950 font-semibold mt-1 text-right line-clamp-1"
                        dir="rtl"
                      >
                        {language === 'ur' ? product.name : product.urduName}
                      </div>
                    )}

                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Price Block */}
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
                          ~Rs. {product.dailyCost}/{t('day', 'روز')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
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
                        <span>{t('Added!', 'شامل!')}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t('Add to Bag', 'خریدیں')}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Assalam-o-Alaikum Dr. M Zargham Ghaffar, I want to order "${product.name}" (Price: Rs. ${product.price}). Please confirm delivery to my address.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 flex items-center justify-center gap-1.5 transition-colors text-center"
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
    </div>
  );
};
