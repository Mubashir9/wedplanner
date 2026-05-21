import { useStore } from '../store/useStore';

const categoryIcons: Record<string, string> = {
  'Personal Documents': 'person_outline',
  'Partner Documents': 'favorite',
  'Marriage Documents': 'auto_stories',
  'Visa Documents': 'credit_card',
};

export function DocumentsView() {
  const { documents, toggleDocument } = useStore();

  return (
    <div className="px-4 md:px-10 py-8 max-w-[1200px] mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
        <div className="w-16 h-16 bg-secondary-fixed/30 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-secondary text-[40px]">attach_file</span>
        </div>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Curated Document Checklist</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Keep track of all required paperwork for your journey. Every step is curated to ensure a serene transition.
          </p>
        </div>
      </div>

      {/* Grid for Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        {documents.map((category) => {
          const totalDocs = category.items.length;
          const uploadedDocs = category.items.filter(d => d.uploaded).length;
          const icon = categoryIcons[category.category] || 'folder_open';

          return (
            <div key={category.category} className="bg-surface-container-lowest rounded-[16px] border border-outline-variant/30 shadow-sm card-lift overflow-hidden hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-start bg-secondary-fixed/5">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed-dim text-[24px]">{icon}</span>
                  <h3 className="font-headline-md text-headline-md text-primary">{category.category}</h3>
                </div>
                <span className="text-sm font-bold text-secondary-fixed-dim">
                  {uploadedDocs} / {totalDocs}
                </span>
              </div>
              
              <div className="p-6 space-y-2">
                {category.items.map((doc, index) => {
                  const isLast = index === category.items.length - 1;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => toggleDocument(category.category, doc.id)}
                      className={`w-full flex items-center justify-between py-3 px-2 rounded-lg transition-all group hover:pl-4 hover:bg-slate-50 ${!isLast ? 'border-b border-outline-variant/5' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <input 
                          type="checkbox"
                          checked={doc.uploaded}
                          readOnly
                          className="custom-checkbox flex-shrink-0" 
                        />
                        <span className={`font-body-md transition-colors text-left ${doc.uploaded ? 'text-on-surface-variant/60 line-through' : 'text-on-surface group-hover:text-primary'}`}>
                          {doc.name}
                        </span>
                      </div>
                      
                      {doc.required && (
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-caps text-[10px] px-2 py-1 rounded-full uppercase tracking-widest shrink-0 ml-4">
                          REQUIRED
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contextual Assistant Area */}
      <section className="mt-20 border-t border-outline-variant/20 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="col-span-2">
            <h4 className="font-headline-md text-headline-md text-primary mb-4 italic">"True organization is the foundation of a peaceful celebration."</h4>
            <p className="font-body-md text-on-surface-variant max-w-lg">
              Our digital concierge team is available to review your uploaded files for compliance before formal submission. Ensure all scans are high-resolution and in color.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
