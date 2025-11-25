
import dynamic from 'next/dynamic';
import "./history.css";
import Beams from '../../beams';
// Lazy load the component
const RequestHistory = dynamic(() => import('../../components/RequestHistory'), {
  loading: () => <p>Loading request history...</p>,
});

export default function HistoryPage() {
  return (
    <div className="history-page">
      <div className="background-div" style={{ width: '100%', height: '600px' }}>
                    

      </div>
      <h1>Request History</h1>
      <RequestHistory />
    </div>
  );
}