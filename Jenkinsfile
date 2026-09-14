pipeline {
    agent any

    stages {
        stage('Docker Build') {
            steps {
                sh 'docker build -t azamrizath/quickdrop:${BUILD_NUMBER} .'
            }
        }
    }
}