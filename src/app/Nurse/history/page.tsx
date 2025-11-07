import dynamic from 'next/dynamic';
import "./history.css";
// Lazy load the component
const RequestHistory = dynamic(() => import('../../components/RequestHistory'), {
  loading: () => <p>Loading request history...</p>,
});

export default function HistoryPage() {
  return (
    <div className="history-page">
      <h1>Request History</h1>
      <RequestHistory />
    </div>
  );
}