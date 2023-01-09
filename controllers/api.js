// const appModel = require("../models/appModel");
const dataFetchModels = require("../models/dataFetchModels");
const axios = require("axios").default;
const parseString = require("xml2js").parseString;
const fs = require("fs");
const xml2js = require("xml2js");
const dataInsertModels = require("../models/dataInsertModels");
var parser = new xml2js.Parser({ explicitArray: false });
const api = {
  recommend: async (req, res) => {
    let nextData;
    let nextProjectId;
    let finalData;
    let active,
      activities,
      additionalDocumentation,
      approvedDate,
      contactAddress,
      contactCity,
      contactCountry,
      contactName,
      contactPostal,
      contactState,
      contactTitle,
      contactUrl,
      country,
      dateOfMostRecentReport,
      donationOption,
      funding,
      goal,
      id,
      imageLink,
      longTermImpact,
      modifiedDate,
      need,
      numberOfDonations,
      numberOfReports,
      progressReportLink,
      projectLink,
      region,
      remaining,
      status,
      summary,
      theme,
      themeName,
      title,
      type,
      orgid;
    function xmltojson(response) {
      let result;
      parser.parseString(response.data, (err, data) => {
        result = data;
      });
      return result;
    }

    ///nextt project generator
    async function nextProjectGen(nextProjectId, count, organId) {
      let Data;
      let DataArr = [];

      for (let i = 1; i < count; i++) {
        await axios
          .get(
            `https://api.globalgiving.org/api/public/projectservice/organizations/${organId}/projects/active?api_key=a12a1031-68bb-4543-a9da-68765945c0ee&nextProjectId=${nextProjectId}`,
            {
              headers: {
                Accept: "application/xml",
                "Content-Type": "application/json",
              },
            }
          )
          .then((responses) => {
            Data = xmltojson(responses);
            nextProjectId = Data.projects.nextProjectId;

            console.log(nextProjectId, count);
            Data.projects.project.map(async (item, i) => {
              value = [item.id, JSON.stringify(item), item.organization.id];

              await dataInsertModels.insertProjects(value);
              DataArr.push(item);
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
      return DataArr;
    }
    async function saveToJson(finalData) {
      const jsonContent = JSON.stringify(finalData);

      fs.writeFile("./alphabet.json", jsonContent, "utf8", function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });
    }

    // const response = await axios
    //   .post(
    //     "https://api.globalgiving.org/api/userservice/tokens",
    //     // '{"auth_request":{"user":{"email":"John_Doe@hotmail.com","password":"somepassword"}, "api_key":"YOUR_API_KEY"}}',
    //     {
    //       auth_request: {
    //         user: {
    //           email: "rafar.heart2@gmail.com",
    //           password: "3xshow123",
    //         },
    //         api_key: "a12a1031-68bb-4543-a9da-68765945c0ee",
    //       },
    //     },
    //     {
    //       headers: {
    //         Accept: "application/xml",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {

    //     var xml = response.data;
    //     parseString(xml, function (err, result) {
    //       console.dir();

    //       let globalgivingAccToken = result.auth_response.access_token[0];
    //     });
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    let renderData = [];

    const data = await dataFetchModels.getOrgId();

    data.map(async (orgId, i) => {
      await axios
        .get(
          `https://api.globalgiving.org/api/public/projectservice/organizations/${orgId.id}/projects/active?api_key=a12a1031-68bb-4543-a9da-68765945c0ee`,
          {
            headers: {
              Accept: "application/xml",
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          nextData = xmltojson(response);

          let nextDataArr = [];
          let datas = [];
          let value = [];
          let count = Math.ceil(nextData.projects.$.numberFound / 10);
          let activeProject = nextData.projects.$.numberFound;
          console.log(activeProject, orgId);
          if (activeProject == 1) {
            nextDataArr.push(nextData.projects.project);

            nextDataArr.map(async (item, i) => {
              value = [item.id, JSON.stringify(item), item.organization.id];
              await dataInsertModels.insertProjects(value);

              datas.push(item);
            });
          }
          if (activeProject > 1) {
            nextData.projects.project.map(async (item, i) => {
              value = [item.id, JSON.stringify(item), item.organization.id];
              await dataInsertModels.insertProjects(value);
              datas.push(item);
            });
          }
          nextProjectId = nextData.projects.nextProjectId;

          //nexr data

          if (count > 1) {
            const nextData2 = await nextProjectGen(
              nextProjectId,
              count,
              orgId.id
            );
            // console.log(nextData2);
            finalData = datas.concat(nextData2);
          } else {
            finalData = datas;
          }
        })

        .catch(function (error) {
          // handle error
          console.log(error, "i");
        });
      // }
    });
    res.render("client/recommendation", { data: renderData });
  },
  randomData: async (req, res) => {
    let arr = [];

    var parser = new xml2js.Parser({ explicitArray: false });
    fs.readFile(
      __dirname + "/../public/content/sample.xml",
      function (err, data) {
        parser.parseString(data, (err, data) => {
          data.projects.project.map((item, i) => {
            arr.push(item);
          });
        });

        res.render("client/recommendation", { data: arr });
      }
    );
  },

  getInvoice: async (req, res) => {
    let globalgivingAccToken;
    await axios
      .post(
        "https://api.globalgiving.org/api/userservice/tokens",
        // '{"auth_request":{"user":{"email":"John_Doe@hotmail.com","password":"somepassword"}, "api_key":"YOUR_API_KEY"}}',
        {
          auth_request: {
            user: {
              email: "rafar.heart2@gmail.com",
              password: "3xshow123",
            },
            api_key: "a12a1031-68bb-4543-a9da-68765945c0ee",
          },
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        globalgivingAccToken = response.data.auth_response.access_token;
        console.log(globalgivingAccToken);
      })
      .then(async (data) => {
        console.log(globalgivingAccToken);

        const url = `https://api.globalgiving.org/api/secure/givingservice/invoices?api_key=a12a1031-68bb-4543-a9da-68765945c0ee&api_token=${globalgivingAccToken}`;
        console.log(url);
        await axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then(async (response) => {
            console.log(response);
          })

          .catch(function (error) {
            console.log(error);
          });
      });

    res.render("client/recommendation", { data: ["hello"] });
  },
};
module.exports = api;
