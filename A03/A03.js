"use strict";
var A03_ZaubertrankEditor;
(function (A03_ZaubertrankEditor) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#potionDurationSlider");
        document.getElementById("createPotionButton").addEventListener("click", handleChange);
        //form.addEventListener("change", handleChange);
        //slider.addEventListener("input", displayAmmount);
    }
    function handleChange(_event) {
        let order = document.querySelector("div#output");
        let formData = new FormData(document.forms[0]);
        console.log(formData);
        for (let entry of formData) {
            console.log(entry);
            let item = document.querySelector("[value='" + entry[1] + "']");
            console.log(item);
            let price = Number(item.getAttribute("price"));
            console.log(price);
            order.innerHTML += item.name + " " + price;
        }
    }
    /*
    function displayAmmount(_event: Event) {
        let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
        let ammount: string = (<HTMLInputElement>_event.target).value;
        progress.value = parseFloat(ammount);
    }*/
})(A03_ZaubertrankEditor || (A03_ZaubertrankEditor = {}));
//# sourceMappingURL=A03.js.map