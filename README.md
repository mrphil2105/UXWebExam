These are the steps to get the project running.

First, the following must be installed:

- Node.js and NPM: https://nodejs.org/en/download/
- .NET 6.0 SDK: https://dotnet.microsoft.com/en-us/download

Then, to run and connect to the project:

- Open a terminal/command prompt.
- Change directory (cd) to the folder that has the .csproj file (in CafeAnalog).
- Run `npm ci` to install the required packages.
- Then run `dotnet run` and the project should build and run.
- In the output it should say what endpoint it is listening on.
- Open a browser and connect to the HTTPS endpoint (allow connection on warning).
