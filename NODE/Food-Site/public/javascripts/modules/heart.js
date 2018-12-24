import axios from "axios";
import { $ } from "./bling";

function ajaxHeart(e) {
  e.preventDefault();
  console.log("hearted!");
  console.log(this);

  axios.post(this.action).then(res => {
    const ishearted = this.heart.classList.toggle("heart__button--hearted");
    $(".heart-count").textContent = res.data.hearts.length;
    if (ishearted) {
      this.heart.classList.add("heart__button--float");
      setTimeout(
        () => this.heart.classList.remove("heart__button--float"),
        2500
      );
    }
  });
}

export default ajaxHeart;