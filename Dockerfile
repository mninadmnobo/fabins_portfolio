# =============================================================================
# FABINS Backend API — Root Dockerfile for Cloud PaaS (Render / Railway)
# =============================================================================

# --- STAGE 1: Build Executable Fat Jar ----------------------------------------
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /build

# Copy Maven Wrapper files & pom.xml from backend/
COPY backend/.mvn/ .mvn/
COPY backend/mvnw backend/pom.xml ./

# Grant execution permission to Maven Wrapper script
RUN chmod +x mvnw

# Download dependencies (offline cache layer)
RUN ./mvnw dependency:go-offline -B

# Copy application source code
COPY backend/src/ src/

# Build production JAR (target/fabins-api.jar) skipping tests
RUN ./mvnw clean package -DskipTests

# --- STAGE 2: Lightweight Production Runtime Image ---------------------------
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# Create dedicated non-root application user
RUN addgroup -S fabinsgroup && adduser -S fabinsuser -G fabinsgroup

# Copy built JAR artifact from builder stage
COPY --from=builder /build/target/fabins-api.jar /app/fabins-api.jar

# Set container permissions
RUN chown -R fabinsuser:fabinsgroup /app

USER fabinsuser

EXPOSE 8080

ENV JAVA_OPTS="-Xms256m -Xmx512m -Djava.security.egd=file:/dev/./urandom"
ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar fabins-api.jar"]
