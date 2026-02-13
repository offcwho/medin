import About from "@/features/about";
import Map from "@/features/map";
import Partners from "@/features/partners";
import Welcome from "@/features/welcome";

export default function Home() {
  return (
    <div className="">
      <Welcome />
      <About />
      <Partners />
      <Map />
    </div>
  )
}
