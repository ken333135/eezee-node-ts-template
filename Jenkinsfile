pipeline {
    agent none
    environment {
        APP_ENV = ""
        dockerImage = ""
        DOCKER_IMAGE_TAG = ""
        NAMESPACE = ""
        NAMESPACED_DEPLOYMENT_FILENAME = ""
        K8S_REPLICAS = ""
        DATABASE_URL = ""
        PROJECT_ID = ""
        CRON_PROJECT_ID = ""
        CRON_NAMESPACE = ""
        CRON_NAMESPACED_DEPLOYMENT_FILENAME = ""
    }

    // trigger build 2
    stages {

        // Check Git Changes
        stage('Setup') {
            agent {
                docker {
                    image 'alpine:latest'
                    reuseNode true
                }
            }
            steps {
                sh 'printenv'
                script {
                    
                    if (env.GIT_PREVIOUS_SUCCESSFUL_COMMIT == env.GIT_COMMIT ) {
                        throw "No Changes found in git"
                    }

                }
            }
        }


        stage('BACKUP DEFAULT ENV TEMPLATE') {
            agent {
                docker {
                    image 'alpine:latest'
                    reuseNode true
                }
            }
            steps {
                sh 'cp .env template.env'
            }
        }

        // ------ STAGING ------
        stage('[STAGE] ENV SETUP') {
            agent {
                docker {
                    image 'alpine:latest'
                    reuseNode true
                }
            }
            steps {
                script {
                    // EDITABLE
                    APP_ENV = 'staging'
                    K8S_REPLICAS = "1"
                    PROJECT_ID = "ez-seller-center-server"

                    // todo to use jenkins' built in credentials
                    DATABASE_URL = "postgresql://eezee_seller_center:7901d4ca-acf5-4a36-bba1-3a38be69cb54@172.20.144.11:5432/eezee_seller_center"

                    // NON EDITABLE
                    NAMESPACE = "${PROJECT_ID}-${APP_ENV}".toLowerCase()
                    NAMESPACED_DEPLOYMENT_FILENAME = "./k8s-deploy-${APP_ENV}.yml".toLowerCase()

                    CRON_PROJECT_ID = "${PROJECT_ID}-cron"
                    CRON_NAMESPACE = "${CRON_PROJECT_ID}-${APP_ENV}".toLowerCase()
                    CRON_NAMESPACED_DEPLOYMENT_FILENAME = "./k8-deploy-cron-${APP_ENV}.yml".toLowerCase()

                    DOCKER_IMAGE_TAG = "latest-${APP_ENV}".toLowerCase()
                    
                }
                sh 'cp template.env .env'
                sh "sed -i \"s#{DATABASE_URL}#${DATABASE_URL}#g\" .env"
                sh "sed -i \"s/{APP_ENV}/${APP_ENV}/g\" .env"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" .env"

            }
        }
        stage('[STAGE] HTTPSERVER - Build Docker Image') {
            steps{
                script {
                    dockerImage = docker.build("eezee-client/${PROJECT_ID}", "-f ./Dockerfile.httpServer .")
                    dockerImageCron = docker.build("eezee-client/${CRON_PROJECT_ID}", "-f ./Dockerfile.cron .")
                }
            }
        }
        stage('[STAGE] HTTPSERVER - Push & Deploy') {
            agent any
            steps{
                sh "cp ./k8s-deploy.yml ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{K8S_REPLICAS}/${K8S_REPLICAS}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{NAMESPACE}/${NAMESPACE}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{PROJECT_ID}/${PROJECT_ID}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"

                script {
                    docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

                        dockerImage.push(DOCKER_IMAGE_TAG)

                    }
                }
                step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: "eezee-client",
                    clusterName: "gke-cluster",
                    location: "asia-southeast1-a",
                    manifestPattern: "${NAMESPACED_DEPLOYMENT_FILENAME}",
                    credentialsId: "eezee-client",
                    verifyDeployments: true
                ])

            }
        }
        stage('[STAGE] CRON - Push & Deploy') {
            agent any
            steps{
                sh "cp ./k8s-deploy-cron.yml ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{NAMESPACE}/${CRON_NAMESPACE}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{PROJECT_ID}/${CRON_PROJECT_ID}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"

                script {
                    docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

                        dockerImageCron.push(DOCKER_IMAGE_TAG)

                    }
                }
                step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: "eezee-client",
                    clusterName: "gke-cluster",
                    location: "asia-southeast1-a",
                    manifestPattern: "${CRON_NAMESPACED_DEPLOYMENT_FILENAME}",
                    credentialsId: "eezee-client",
                    verifyDeployments: true
                ])

            }
        }


        // ------ PRODUCTION ------
        stage('[PROD] ENV SETUP') {
            agent {
                docker {
                    image 'alpine:latest'
                    reuseNode true
                }
            }
            steps {
                script {
                    // EDITABLE
                    APP_ENV = 'production'
                    K8S_REPLICAS = "2"
                    PROJECT_ID = "ez-product-information-server"

                    // todo to use jenkins' built in credentials
                    DATABASE_URL = "postgresql://eezee_product_information:6ca2b421-9170-4997-b3fe-8d4a2392fc64@172.20.144.5:5432/eezee_product_information"

                    // NON EDITABLE
                    NAMESPACE = "${PROJECT_ID}-${APP_ENV}".toLowerCase()
                    NAMESPACED_DEPLOYMENT_FILENAME = "./k8s-deploy-${APP_ENV}.yml".toLowerCase()

                    CRON_PROJECT_ID = "${PROJECT_ID}-cron"
                    CRON_NAMESPACE = "${CRON_PROJECT_ID}-${APP_ENV}".toLowerCase()
                    CRON_NAMESPACED_DEPLOYMENT_FILENAME = "./k8-deploy-cron-${APP_ENV}.yml".toLowerCase()

                    DOCKER_IMAGE_TAG = "latest-${APP_ENV}".toLowerCase()
                    
                }
                sh 'cp template.env .env'
                sh "sed -i \"s#{DATABASE_URL}#${DATABASE_URL}#g\" .env"
                sh "sed -i \"s/{APP_ENV}/${APP_ENV}/g\" .env"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" .env"

            }
        }
        stage('[PROD] HTTPSERVER - Build Docker Image') {
            steps{
                script {
                    dockerImage = docker.build("eezee-client/${PROJECT_ID}", "-f ./Dockerfile.httpServer .")
                    dockerImageCron = docker.build("eezee-client/${CRON_PROJECT_ID}", "-f ./Dockerfile.cron .")
                }
            }
        }
        stage('[PROD] HTTPSERVER - Push & Deploy') {
            agent any
            steps{
                sh "cp ./k8s-deploy.yml ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{K8S_REPLICAS}/${K8S_REPLICAS}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{NAMESPACE}/${NAMESPACE}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{PROJECT_ID}/${PROJECT_ID}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"

                script {
                    docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

                        dockerImage.push(DOCKER_IMAGE_TAG)

                    }
                }
                step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: "eezee-client",
                    clusterName: "gke-cluster",
                    location: "asia-southeast1-a",
                    manifestPattern: "${NAMESPACED_DEPLOYMENT_FILENAME}",
                    credentialsId: "eezee-client",
                    verifyDeployments: true
                ])

            }
        }
        stage('[PROD] CRON - Push & Deploy') {
            agent any
            steps{
                sh "cp ./k8s-deploy-cron.yml ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{NAMESPACE}/${CRON_NAMESPACE}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{PROJECT_ID}/${CRON_PROJECT_ID}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"

                script {
                    docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

                        dockerImageCron.push(DOCKER_IMAGE_TAG)

                    }
                }
                step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: "eezee-client",
                    clusterName: "gke-cluster",
                    location: "asia-southeast1-a",
                    manifestPattern: "${CRON_NAMESPACED_DEPLOYMENT_FILENAME}",
                    credentialsId: "eezee-client",
                    verifyDeployments: true
                ])

            }
        }

    }
}