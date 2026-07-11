// Local, static blog content — no CMS/API involved. The site previously
// fetched blog posts from https://order.tareeqk.ae, but that backend's
// /blogs list endpoint returns a real HTTP 404 and individual /pages
// slugs come back as "Page not found", so there was never any live blog
// content to show. This file is the source of truth now; add new posts
// here directly.
//
// Only English content exists so far — ar/ur will show the same English
// article until real translations are written, rather than nothing at
// all. Swap `html` per-language if/when translated copy exists.

export const BLOGS = [
  {
    id: 1,
    slug: 'how-to-choose-a-trusted-car-recovery-service-in-dubai',
    title: 'How to Choose a Trusted Car Recovery Service in Dubai',
    description:
      'Why choosing the right recovery service matters, what to look for in a provider, and why Tareeqk is built for it.',
    image: '/tareeqktow.jpg',
    date: '2026-07-11',
    mins: 6,
    section: 'Guides',
    html: `
      <h2>Why choosing the right recovery service matters</h2>
      <p>A car breakdown can happen without warning, whether you are on a busy highway, in the city, or parked somewhere far from help. In those moments, the quality of the recovery service matters because it affects your safety, your time, and your peace of mind. A trusted provider should respond quickly, handle your vehicle carefully, and make the process simple from the start.</p>
      <p>In Dubai, drivers also expect convenience. That is why modern recovery services are moving toward digital booking and real-time support. With Tareeqk, you get a smarter way to request help without unnecessary delays.</p>

      <h2>What to look for in a trusted service</h2>
      <p>A reliable car recovery service should offer more than just a tow truck. Before choosing a provider, check for the following:</p>
      <ul>
        <li>Fast response time so you are not left waiting for long.</li>
        <li>Dubai-wide coverage so help can reach you wherever you are.</li>
        <li>Simple booking process that works well during emergencies.</li>
        <li>Clear communication so you know what to expect.</li>
        <li>Safe vehicle handling by a professional recovery team.</li>
      </ul>

      <h2>Why Tareeqk is a better choice</h2>
      <p>Tareeqk is designed for drivers who want a modern and dependable recovery experience. Instead of relying on slow phone calls or unclear support, customers can book help through the app in a faster and more organized way. This makes the entire process easier when time matters most.</p>
      <p>The app also helps reduce confusion during emergencies. You can share your location, request assistance, and move through the process with less back-and-forth. For Dubai drivers, that means less stress and a quicker path to recovery.</p>

      <h2>App benefits of Tareeqk</h2>
      <ul>
        <li>Faster booking, so you can request help in just a few steps.</li>
        <li>Convenient mobile access, which is useful when you are stranded or in a rush.</li>
        <li>Better location accuracy, helping the recovery team find you more easily.</li>
        <li>Less communication delay, since your request is already captured in the app.</li>
        <li>A smoother customer experience, especially during urgent roadside situations.</li>
        <li>Modern service approach, designed for today's drivers in Dubai.</li>
      </ul>
      <p>These benefits matter because breakdowns are stressful enough on their own. Tareeqk helps remove extra friction from the process so drivers can focus on getting safe, quick support.</p>

      <h2>Conclusion</h2>
      <p>Choosing a trusted car recovery service in Dubai is about finding a provider that is fast, professional, and easy to use. Tareeqk brings those qualities together through its app-based platform, helping drivers get support with less stress and more confidence.</p>
    `,
  },
]

export function getBlogBySlugOrId(slugOrId) {
  const needle = String(slugOrId).replace(/^blog-/, '')
  return BLOGS.find((b) => b.slug === slugOrId || String(b.id) === needle) || null
}
