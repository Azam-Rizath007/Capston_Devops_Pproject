# QuickDrop Delivery Website

QuickDrop is a static delivery-service website used as the application for an end-to-end DevOps capstone project.

The website is built using HTML, CSS, and JavaScript and is served using Nginx inside a Docker container.

## Application Files

- `index.html` - Main web page
- `style.css` - Website styling
- `script.js` - Front-end JavaScript
- `Dockerfile` - Docker image build instructions
- `Jenkinsfile` - Jenkins CI/CD pipeline
- `README.md` - Project documentation

## Running the Website Locally

1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Open `index.html` directly in a browser or use VS Code Live Server.
3. No internet connection is required for the website itself.

## Application Notes

- The order form is a front-end demonstration and does not send data to a backend server.
- Phone numbers, email addresses, testimonials, and the brand name are sample content.
- QuickDrop is containerized using Nginx and deployed through Jenkins, Docker, and AWS EC2.

# DevOps Architecture

The project uses the following workflow:

Developer PC
    |
    | git push
    v
GitHub
    |
    | Webhook
    v
Jenkins EC2
    |
    | Docker Build
    v
Docker Hub
    |
    | Docker Pull + SSH
    v
Application EC2
    |
    |-- QuickDrop Docker Container
    |
    |-- Node Exporter
            |
            v
       Prometheus
            |
            v
         Grafana

## Tools and Technologies

- **Git** - Source code version control
- **GitHub** - Remote source code repository
- **Jenkins** - CI/CD pipeline automation
- **Docker** - Application containerization
- **Docker Hub** - Docker image registry
- **AWS EC2** - Cloud infrastructure
- **Nginx** - Web server
- **Node Exporter** - Linux host metrics exporter
- **Prometheus** - Metrics collection and storage
- **Grafana** - Monitoring visualization
- **Bash** - Maintenance automation
- **Cron** - Scheduled execution of maintenance tasks

## CI/CD Pipeline

1. The developer modifies the QuickDrop source code.
2. Changes are committed and pushed to GitHub.
3. GitHub sends a webhook to Jenkins.
4. Jenkins automatically starts the pipeline.
5. Jenkins builds a new versioned Docker image.
6. Jenkins pushes the image to Docker Hub.
7. Jenkins connects to the Application EC2 using SSH.
8. The Application EC2 pulls the new Docker image.
9. The previous QuickDrop container is replaced.
10. The updated application runs on port 80.

## Monitoring

Node Exporter runs on the Application EC2 and exposes Linux system metrics on port `9100`.

Prometheus runs on the Monitoring EC2 and scrapes Node Exporter using the Application EC2 private IP.

Grafana runs on the Monitoring EC2 and uses Prometheus as its data source.

The Grafana dashboard displays metrics including:

- CPU usage
- Memory usage
- Disk usage
- Network traffic
- System load
- System uptime

## Bash and Cron Automation

A Bash maintenance script is stored on the Application EC2 at:

`/opt/quickdrop/quickdrop-maintenance.sh`

The script:

- Creates a timestamped backup of the current QuickDrop Docker container configuration.
- Compresses the backup as a `.tar.gz` archive.
- Removes matching backup archives older than seven days.

Cron automatically executes the maintenance script every day at `02:00` server time.

## Deployment

QuickDrop is served by Nginx inside a Docker container.

The application is automatically redeployed when new source code is pushed to the GitHub `main` branch and the GitHub webhook triggers the Jenkins pipeline.