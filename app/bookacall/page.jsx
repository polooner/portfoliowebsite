'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export default function BookACall() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);
  return (
    <div className='block items-center justify-center'>
      <Cal
        calLink='wojdafilip/15min'
        style={{
          width: '100%',
          height: '100%',
          overflow: 'scroll',
          placeSelf: 'center',
        }}
        className='self-center'
        config={{ layout: 'month_view' }}
      />
    </div>
  );
}
