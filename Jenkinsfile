pipeline {
    agent any

    stages {
        stage('Docker Build') {
            steps {
                sh 'docker build -t azamrizath/quickdrop:${BUILD_NUMBER} .'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        docker push azamrizath/quickdrop:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy to App Server') {
            steps {
                sshagent(['app-server-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@172.31.17.205 "
                            sudo docker pull azamrizath/quickdrop:${BUILD_NUMBER} &&
                            (sudo docker rm -f quickdrop || true) &&
                            sudo docker run -d \
                                --name quickdrop \
                                --restart unless-stopped \
                                -p 80:80 \
                                azamrizath/quickdrop:${BUILD_NUMBER}
                        "
                    '''
                }
            }
        }
    }
}