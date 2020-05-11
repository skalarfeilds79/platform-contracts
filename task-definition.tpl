{
  "containerDefinitions": [
        {
      "essential": true,
      "image": "${IMAGE_NAME}",
      "memoryReservation": 1024,
      "memory": 1024,
      "name": "${APP_NAME}-ganache",
      "command": "ganache-cli --networkId 50 --accounts 20 -l 19000000 -e 10000000000 -m 'concert load couple harbor equip island argue ramp clarify fence smart topic'",
      "portMappings": [
        {
          "containerPort": 8545
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${CLUSTER_NAME}/${APP_NAME}-ganache",
          "awslogs-region": "${AWS_DEFAULT_REGION}",
          "awslogs-stream-prefix": "${APP_NAME}-ganache"
        }
      },
      "environment": [
      ],
      "secrets": [ ]
    },
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
PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d"
RPC_ENDPOINT = "http://localhost:8545"
ETHERSCAN_KEY = ""
DEPLOYMENT_ENVIRONMENT = "development"
DEPLOYMENT_NETWORK_ID = 50
MINT_AMOUNT = 50
DEFAULT_PRICE = 0.01
API_ENDPOINT = ""
      ],
      "secrets": []
    }
  ],
  "family": "${CLUSTER_NAME}-${APP_NAME}",
  "executionRoleArn": "arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecs-task-${CLUSTER_NAME}-${AWS_DEFAULT_REGION}"
}
