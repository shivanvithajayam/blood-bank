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
            <Beams
              beamWidth={1}
              beamHeight={20}
              beamNumber={9}
              lightColor="#F00F0F"    // changed from white to red 660001
              speed={2}
              noiseIntensity={2}
              scale={0.2}
              rotation={30}
            />
            

      </div>
      <h1>Request History</h1>
      <RequestHistory />
    </div>
  );
}