import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

const HomePage = ({events}) => {
  return (
    <Layout>
          <h1>Upcoming Events</h1>
          {events.length === 0 && <h3> No events to show</h3>}

          {events.map(evt => (
            <EventItem key={evt.id} evt={evt} />
          ))}

          {events.length > 0 && (
            <Link href="/events">
              <a className='btn-secondary'>View All Events</a>
            </Link>
          )}


    </Layout>
  )
}

export default HomePage

//requests at build time
export async function getStaticProps() {
  // const res = await fetch(`${API_URL}/api/events`); //localhost
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`); //STRAPI
  const events = await res.json();

  // console.log(events);

  return {
    // props: {events: events.slice(0,3)},  //localhost
    props: {events},
    revalidate: 1 // if data has changed
  }
}