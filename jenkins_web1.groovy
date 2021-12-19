pipeline {
    environment {
        BUILD_ENV = "dev"
        DIST_ROOT = "/var/jenkins_home/workspace/httpd_data" // 웹 페이지 결과
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


