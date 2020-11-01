namespace A03_ZaubertrankEditor {
    window.addEventListener("load", handleLoad);


    function handleLoad(_event: Event) {
        console.log("Start");
        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#potionDurationSlider");
        document.getElementById("createPotionButton").addEventListener("click", handleChange);     

        //form.addEventListener("change", handleChange);
        //slider.addEventListener("input", displayAmmount);
    }

    function handleChange(_event: Event) {
        let order = document.querySelector("div#output");

        let formData: FormData = new FormData(document.forms[0]);
        console.log(formData);
        for (let entry of formData){
            console.log(entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            console.log(item);
            let price: number = Number(item.getAttribute("price"));
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
}

