# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Build docker container

You can run docker adding the name of the container as monitoreo or any name you want, it's only to know which container it is.

docker build -t monitoreo .

## Run docker container

Run the following command to run the docker container specifing the name of the cotainer and the port on which will be expose. By aware of the ports allowed to connect through the vite.config.js file and the server or EC2 insance.

docker run -p 8081:8081 monitoreo
