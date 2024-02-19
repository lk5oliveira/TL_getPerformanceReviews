async function openAllReviews() {
    await runLoop();
    openReview();
}

// Get the scroll bar
let scrollElement = document.querySelector('.sc-hHEiqL.iowLYj.custom-dashboard-table-wrapper.mobileCardLayout.false');


// Scroll to button every 2 seconds - necessary due to the page pagination
function scrollToBottomAndWait() {

    // Scroll to the bottom
    scrollElement.scrollTop = scrollElement.scrollHeight;
    
    return new Promise(resolve => {
        // wait 2 secs
        setTimeout(() => {
            console.log('Loading');
            resolve();
        }, 2000);
    });

}

// Scroll 10 times to the bottom
function runLoop() {

    return new Promise(async resolve => {
        for (let i = 0; i < 10; i++) {
            await scrollToBottomAndWait();
        }
        resolve();
    });

}

// Get the list of reviews and print agent, date and link
function openReview() {

    // Agents list (array)
    let agents = [
        'Kenneth_P',
        'Eleazar_A',
        'Haseeb_N',
        'Jason_A',
        'Shane_Di',
        'Eliza_G',
        'Neil_I',
        'Jomel_C',
        'Mikhail_T',
        'Silvano_E',
        'Karlo_F',
        'Gian_C',
        'Mary_A',
        'Abdul_E',
        'Ryan_Cas',
        'Manilene_L',
        'Danilo_D',
        'Lars_L',
        'Jovanne_A',
        'Mike_G'
      ];

    // Select the table row
    const elements = document.getElementsByClassName("custom-dashboard-table-row");
 

    // Loop start on object 2 to the last element
    for (let i = 2; i < elements.length; i++) {
        // Go over the agent list to find a match on each row of the review table
        for (let j = 0; j < agents.length; j++) {
            // Table cell with the agent name
            let cellText = elements[i].getElementsByClassName("custom-dashboard-table-cell")[0].textContent;

            // Check if table cell with the agent name contains an agent from the team's agent list
            if (cellText.includes(agents[j])) {
                // If true, print the review info
                let hrefValue = elements[i].children[9].children[0].href;
                let reviewDate = elements[i].children[4].textContent.split(' ')[0];
                console.log('-------------------------------------')
                console.log('Agent:', agents[j]);
                console.log('Review Date:', reviewDate);
                console.log('Review link:', hrefValue);
                console.log('-------------------------------------')

                // Open all the links on another tab !! CONSUMES A LOT OF RAM, ONLY USE IF YOU HAVE ENOUGH RAM !!
                //window.open(hrefValue, '_blank');

                break;
            }
        }
    }
}

openAllReviews();