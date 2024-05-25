import { ClientOnly } from 'remix-utils/client-only';
import Blur from 'app/blur.client';

export default function Root() {
  return (
    <ClientOnly>
      {() => <Blur className=' blur-[0px] bg-[#171b22]' />}
    </ClientOnly>
  );
}
