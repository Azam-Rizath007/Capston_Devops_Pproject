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
                        echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push azamrizath/quickdrop:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
}