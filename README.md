# PeerPrep
PeerPrep is a collaborative coding platform designed to bridge the gap in existing coding platforms. It allows users to team up and work on Leetcode questions together, fostering a collaborative learning experience. With features like real-time interaction and matchmaking, PeerPrep is ideal for those looking to tackle coding challenges in a team setting.

<a href="https://docs.google.com/document/d/1Rtm1sSZUpHFsBxIw6-9CPRNGJyFG90Ql1ISGl1W6hnE/edit?usp=sharing">Project Documentation</a>

## Features

Main features of the application (User's Perspective)

- **Collaborative Coding**: Real-time shared editor with syntax highlighting
- **Communication**: Chatbox for users to discuss approaches to tackle the coding problem
- **Match Making**: Join a queue (Easy, Medium, Hard) and get matched with other users 
- **Code Execution**: Run code against a suite of test cases to check for correctness of code
- **Questions**: A question bank synced with Leetcode that includes images and description
- **Authentication**: Personalized experience and privacy
- **History**: Track past questions successfully tackled / failed to tackle
- **Custom Room**: Create custom room to code with friends instead of matching with strangers
- **Multiple language support**: Code in Python, JavaScript, or Ruby
- **Changing questions on the fly**: Change question within a room without having to quit and rematch

## Architecture
PeerPrep is built to be a microservice, practicing database per service pattern.

- **Horizontal Pod Autoscalers (HPA)**: Stateless services are equipped with HPAs to scale horizontally when a certain metric threshold is met, to handle spike load
- **cert-manager**: K8s cluster has cert-manager configured to provide TLS encryption between frontend and the cluster
- **Configured with Ingress, Service, and Deployment resources**

## Tech Stack
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Kubernetes-3069DE?style=for-the-badge&logo=kubernetes&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
<img src="https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
