pipeline {
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:ci'
            }
            post {
                always {
                    junit testResults: 'reports/junit.xml',
                          allowEmptyResults: true
                }
            }
        }
    }

    post {
        success {
            echo 'Build passed!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}