package com.fabins.service;

import com.fabins.entity.DeploymentRequest;

/**
 * Service for sending automated email notifications for deployment enquiries.
 */
public interface EmailService {

    /**
     * Sends both the internal R&D notification email and the external sender confirmation email.
     *
     * @param request the newly submitted deployment request
     */
    void sendDeploymentRequestNotifications(DeploymentRequest request);

    /**
     * Sends an email notification to the sender confirming that their request has been acknowledged by Saturn R&D.
     *
     * @param request the acknowledged deployment request
     */
    void sendAcknowledgementNotification(DeploymentRequest request);
}
