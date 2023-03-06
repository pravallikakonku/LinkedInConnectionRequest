let Linkedin = {
    config: {
        actionDelay: 1000,
        maxRequests: -1,
        totalRequestsSent: 0,
    },
    init: function (data, config) {
        setTimeout(() => this.inspect(data, config), config.actionDelay);
    },
    inspect: function (data, config) {
        var totalRows = this.totalRows(); 
        if (totalRows >= 0) {
            this.compile(data, config);
        }
    },
    compile: function (data, config) {
        var elements = document.querySelectorAll('button');
        data.pageButtons = [...elements].filter(function (element) {
            return element.textContent.trim() === "Connect";
        });
            data.pageButtonTotal = data.pageButtons.length;
            data.pageButtonIndex = 0;
            var names = document.getElementsByClassName("entity-result__title-text");
            names = [...names].filter(function (element) {
                return element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.textContent.includes("Connect\n");
            });
            data.connectNames = [...names].map(function (element) {
                return element.innerText.split(" ")[0];
            });
            
            setTimeout(() => { this.sendInvites(data, config) }, config.actionDelay);
        
    },
    sendInvites: function (data, config) {
        if (config.maxRequests == 0){
            this.complete(config);
        } else {
            var button = data.pageButtons[data.pageButtonIndex];
            button.click();
               setTimeout(() => this.clickDone(data, config), config.actionDelay);
        }
    },
    
    clickDone: function (data, config) {
        var buttons = document.querySelectorAll('button');
        var doneButton = Array.prototype.filter.call(buttons, function (el) {
            return el.textContent.trim() === 'Send';
        });
        if (doneButton && doneButton[0]) {
            doneButton[0].click();
        } else {
            console.log(" Sent ");
         }
        setTimeout(() => this.clickClose(data, config), config.actionDelay);
    },
    clickClose: function (data, config) {
        var closeButton = document.getElementsByClassName('artdeco-modal__dismiss artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view');
        if (closeButton && closeButton[0]) {
            closeButton[0].click();
        }
        config.maxRequests--;
        config.totalRequestsSent++;
            data.pageButtonIndex++;
            setTimeout(() => this.sendInvites(data, config), config.actionDelay);
    },
    totalRows: function () {
        var search_results = document.getElementsByClassName('search-result');
        if (search_results && search_results.length != 0) {
            return search_results.length;
        } else {
            return 0;
        }
    }
}
Linkedin.init({}, Linkedin.config);
