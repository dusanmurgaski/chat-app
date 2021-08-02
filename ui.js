class ChatUI {
  constructor(u) {
    this.ul = u;
  }
  set ul(x) {
    this._ul = x;
  }
  get ul() {
    return this._ul;
  }
  formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    if (h < 10) {
      h = "0" + h;
    }
    let min = date.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    return `${d}.${m}.${y} - ${h}:${min}`;
  }
  formatDate2(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    if (h < 10) {
      h = "0" + h;
    }
    let min = date.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    return ` ${h}:${min}`;
  }
  templateLI(data) {
    let date = data.created_at.toDate();
    let datum = new Date();
    let dan = datum.getDate();
    let stringDate = String(date);
    let stringDan = String(dan);
    if (stringDate.includes(stringDan)) {
      let htmlLI = `<li>
      <span class="username"> ${data.username}:
      </span>
      <span class="message"> ${data.message}
      </span>
      <span> <i id="kanta"  class="fa fa-trash-o" name="${
        data.message
      }" style="font-size: 25px"></i> </span>
      <div> ${this.formatDate2(date)}</div>
      </li> `;
      this.ul.innerHTML += htmlLI;
      // this.list.scrollTop = this.list.scrollHeight;
    } else {
      let htmlLI = `<li>
      <span class="username"> ${data.username}:
      </span>
      <span class="message"> ${data.message}
      </span>
      <span> <i id="kanta" class="fa fa-trash-o" name="${
        data.message
      }"  style="font-size: 25px"></i> </span>
      <div> ${this.formatDate(date)}</div>
      </li> `;
      this.ul.innerHTML += htmlLI;
      // this.list.scrollTop = this.list.scrollHeight;
    }
  }
  clearUl() {
    this.ul.innerHTML = "";
  }
}
export { ChatUI };
