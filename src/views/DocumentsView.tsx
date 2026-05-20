import { useStore } from '../store/useStore';
import { Check, Paperclip } from 'lucide-react';

export function DocumentsView() {
  const { documents, toggleDocument } = useStore();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center mb-8">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Paperclip className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Document Checklist</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Keep track of all required paperwork. Physical copies are often needed for ceremonies, and digital scans are required for the visa application.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents.map((category) => {
          const totalDocs = category.items.length;
          const uploadedDocs = category.items.filter(d => d.uploaded).length;
          const isCategoryComplete = totalDocs > 0 && uploadedDocs === totalDocs;

          return (
            <div key={category.category} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">{category.category}</h3>
                <span className={`text-sm font-bold px-2 py-1 rounded-md ${isCategoryComplete ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                  {uploadedDocs} / {totalDocs}
                </span>
              </div>
              <div className="p-2">
                {category.items.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => toggleDocument(category.category, doc.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left ${
                      doc.uploaded 
                        ? 'bg-blue-50/50 hover:bg-blue-50' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                      doc.uploaded 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'border-slate-300 bg-white text-transparent'
                    }`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${doc.uploaded ? 'text-slate-600' : 'text-slate-800'}`}>
                        {doc.name}
                      </p>
                      {doc.required && (
                        <p className="text-xs text-red-500 font-medium uppercase mt-0.5">Required</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
