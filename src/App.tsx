import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { useStore } from './store/useStore';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { TimelineView } from './views/TimelineView';
import { DocumentsView } from './views/DocumentsView';
import { MilestonesView } from './views/MilestonesView';
import { defaultTimeline, defaultDocuments, defaultMilestones } from './store/initialData';
import { Loader2 } from 'lucide-react';

function App() {
  const { userId, setUserId, loadData, loading, setLoading } = useStore();
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        
        // Fetch user data from Firestore
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          
          if (docSnap.exists()) {
            loadData(docSnap.data());
          } else {
            // First time login, save default data
            const initialData = {
              timeline: defaultTimeline,
              documents: defaultDocuments,
              milestones: defaultMilestones,
            };
            await setDoc(userRef, initialData);
            loadData(initialData);
          }
        } catch (error) {
          console.error("Error loading data:", error);
          setLoading(false);
        }
      } else {
        setUserId(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUserId, loadData, setLoading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!userId) {
    return <Login />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'timeline' && <TimelineView />}
      {activeTab === 'documents' && <DocumentsView />}
      {activeTab === 'milestones' && <MilestonesView />}
    </Layout>
  );
}

export default App;
