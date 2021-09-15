
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'

export default function EventsPage({ events,page,total }) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />

    </Layout>
  )
}


//requests at build time
// export async function getStaticProps() {
//     // const res = await fetch(`${API_URL}/api/events`); //localhost
//     const res = await fetch(`${API_URL}/events?_sort=date:ASC`); //STRAPI
//     const events = await res.json();
  
//     // console.log(events);
  
//     return {
//       props: {events},
//       revalidate: 1 // if data has changed
//     }
//   }



export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page (checking if we are in first page)
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },
  }
}