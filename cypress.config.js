const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const ExcelJs =require('exceljs');



async function setupNodeEvents(on, config) {
  config.db = {
    userName: "rsa",
    password: "Azure!10",
    server: "rsadbdemo2.database.windows.net",
    options: {
        database: "rahulshettyacademy",
        encrypt: true,
        rowCollectionOnRequestCompletion : true
    }
}
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  require('cypress-mochawesome-reporter/plugin')(on);

  //to run cucumber browsify-cts, refer documentation
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);  

  on('task',{

        excelToJsonConverter(filePath)
        {
          const result = excelToJson({
          source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
        });
        return result;
        }
  })

  on('task', {

   async writeExcelTest({searchText,replaceText,change,filePath})
    {
        
      const workbook = new ExcelJs.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet('Sheet1');
      const output= await readExcel(worksheet,searchText);
    
      const cell = worksheet.getCell(output.row,output.column+change.colChange);
      cell.value = replaceText;
      //pending resolved rejected
      return workbook.xlsx.writeFile(filePath).then(()=>
      {
        return true;
      })
      .catch((error)=>
        {
          return false;
        })

    
    }

  })


  //




  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
    {
          row.eachCell((cell,colNumber) =>
          {
              if(cell.value === searchText)
              {
                  output.row=rowNumber;
                  output.column=colNumber;
              }
  
  
          }  )
    
    })
    return output;
}



module.exports = defineConfig({

  defaultCommandTimeout: 6000,
  env: {
    //if env is passed through command line it will take precedence (--env url="")
    url: "https://rahulshettyacademy.com",
  },
  reporter: 'cypress-mochawesome-reporter',

  retries: {
    runMode: 1,
//If test fails it will rerun once
  },
  projectId: "nodpcq",

  e2e: {
    setupNodeEvents,
    //update this pattern for test runner to detect tests
    specPattern: 'cypress/integration/examples/*.js'
  },
});
//For reports, cucumber html plugin can consume the json file and generate html results
//1. Get tests results into json file format
//Refer cypress-cucumber-preprocessor 
//2. download cucumber-json-formattter exe and paste it in main project directory
//Now when you run tests json file will be generated
//3. Install multiple cucumber html reporter (refer document)
//add meta data in cucumber-html-report.js
//4. execute cucumber-html-report.js file, command -> node "path"  
