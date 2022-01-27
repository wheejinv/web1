pipeline {
    environment {
        BUILD_ENV = "dev"
        DIST_ROOT = "/var/jenkins_home/workspace/httpd_data" // 웹 페이지 결과
				WORK_ROOT = "/var/jenkins_home/workspace/web1" // 젠킨스에서 git 소스 pull 받아서 보관하고 있는 경로
    }

    agent any

    stages {
        stage('COPY SOURCE') {
            steps {
                script {
                    sh """
												echo whoami
												whoami

												npm run build_prod

                        echo copy public folder
                        cp -fr ${WORK_ROOT}/public/* ${DIST_ROOT}

												echo copy dist folder
												cp -fr ${WORK_ROOT}/dist ${DIST_ROOT}
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


