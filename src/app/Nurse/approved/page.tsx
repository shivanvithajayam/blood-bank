import dynamic from 'next/dynamic';
import "approved.css";

// Lazy load the component
const ApprovedRequests = dynamic(() => import('./components/ApprovedRequests'), {
 loading: () => <p>Loading approved requests...</p>,
});

export default function ApprovedPage() {
  return (
    <div className="approved-page">
      <h1>Approved Requests</h1>
      <ApprovedRequests />
    </div>
  );
}
