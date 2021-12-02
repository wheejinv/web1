pipeline {
    environment {
        BUILD_ENV = "dev"
    }

    agent any

    stages {
        stage('SETUP') {
            steps {
                script {
                    sh """
                        echo setup
                    """
                }
            }
        }
    }

    post {
        success {
            sh """
                echo web1 success
               """
        }

        failure {
            sh """
                echo web1 failure
            """
        }
    }
}


