import "./style.css";
import { renderOptionsPage } from "@/components/options-page";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
  throw new Error("Expected the options app container to exist.");
}

renderOptionsPage(app);
