{
  "containerDefinitions": [
    {
      "essential": true,
      "image": "${IMAGE_NAME}",
      "memoryReservation": 1024,
      "memory": 1024,
      "name": "${APP_NAME}",
      "portMappings": [
        {
          "containerPort": ${CONTAINER_PORT}
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${CLUSTER_NAME}/${APP_NAME}",
          "awslogs-region": "${AWS_DEFAULT_REGION}",
          "awslogs-stream-prefix": "${APP_NAME}"
        }
      },
      "environment": [
        { "name" : "PRIVATE_KEY", "value" : "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d" },
        { "name" : "RPC_ENDPOINT", "value" : "http://ganache.dev.cloud.immutable.com:8545" },
        { "name" : "ETHERSCAN_KEY", "value" : "" },
        { "name" : "DEPLOYMENT_ENVIRONMENT", "value" : "development" },
        { "name" : "DEPLOYMENT_NETWORK_ID", "value" : "50" },
        { "name" : "MINT_AMOUNT", "value" : "50" },
        { "name" : "DEFAULT_PRICE", "value" : "0.01" },
        { "name" : "API_ENDPOINT", "value" : "" }
      ],
      "secrets": []
    }
  ],
  "family": "${CLUSTER_NAME}-${APP_NAME}",
  "executionRoleArn": "arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecs-task-${CLUSTER_NAME}-${AWS_DEFAULT_REGION}"
}
