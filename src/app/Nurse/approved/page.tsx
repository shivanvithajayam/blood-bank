import dynamic from 'next/dynamic';
import "./approved.css";
import Beams from '../../beams';

// Lazy load the component
const ApprovedRequests = dynamic(() => import('../../components/ApprovedRequests'), {
 loading: () => <p>Loading approved requests...</p>,
});

export default function ApprovedPage() {
  return (
    <div className="approved-page">
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
      <h1>Approved Requests</h1>
      <ApprovedRequests />
    </div>
  );
}
