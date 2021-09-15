import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';



const EventPage = ({evt}) => {

    const router = useRouter();
  
    return (
        <Layout>
            <div className={styles.event}>
                {/* <div className={styles.controls}>
                  <Link href={`/events/edit/${evt.id}`}>
                      <a>
                          <FaPencilAlt /> Edit Event
                      </a>
                  </Link>
                  <a href="#" className={styles.delete} 
                     onClick={deleteEvent} >
                         <FaTimes /> Delete Event
                     </a>
                </div> */}

                <span>
                {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                <ToastContainer />

                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image.formats.medium.url}
                               width={960}
                               height={600}
                         />      
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{evt.performers}</p>              
                <h3>Description:</h3>
                <p>{evt.description}</p>               
                <h3>Venue:</h3>
                <p>{evt.address}</p>
          
                <EventMap evt={evt} />

                <Link href='/events'>
                    <a className={styles.back} >
                        {'<'} Go Back
                    </a>
                </Link>

            </div>
         
        </Layout>
    )
}

export default EventPage

/* Using Strapi */

export async function getStaticPaths() {

    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();

    //creating an array of objects containing all paths
    const paths = events.map (evt => ({
        params: {slug: evt.slug}
    }))

    return{
        paths,
        fallback: true,
    }
}


export async function getStaticProps({params: {slug}}) {

    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const events = await res.json();

    return {
        props: {
            evt: events[0]
        },
        revalidate: 1
    }
}


/* Using Localhost */

//STATIC GENERATION
// export async function getServideSideProps({query: {slug}}) {

//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const events = await res.json();

//     return {
//         props: {
//             evt: events[0]
//         }
//     }
// }

//DYNAMIC GENERATION

// export async function getStaticPaths() {

//     const res = await fetch(`${API_URL}/api/events`);
//     const events = await res.json();

//     //creating an array of objects containing all paths
//     const paths = events.map (evt => ({
//         params: {slug: evt.slug}
//     }))

//     return{
//         paths,
//         fallback: true,
//     }
// }


// export async function getStaticProps({params: {slug}}) {

//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const events = await res.json();

//     return {
//         props: {
//             evt: events[0]
//         },
//         revalidate: 1
//     }
// }