package com.fabins.service.impl;

import com.fabins.dto.request.CreateDeploymentRequest;
import com.fabins.dto.response.DeploymentRequestResponse;
import com.fabins.dto.response.PageResponse;
import com.fabins.entity.DeploymentRequest;
import com.fabins.entity.enums.DeploymentRequestStatus;
import com.fabins.exception.ResourceNotFoundException;
import com.fabins.mapper.DeploymentRequestMapper;
import com.fabins.repository.DeploymentRequestRepository;
import com.fabins.service.DeploymentRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Default implementation of {@link DeploymentRequestService}.
 *
 * <p>Sits between the controller and the repository. The controller deals with
 * HTTP — status codes, headers, payload binding — and this class deals with
 * what the application actually does.
 *
 * <h2>Transactions</h2>
 * The class is annotated {@code @Transactional(readOnly = true)} so queries run
 * in a read-only transaction by default; the two methods that write override it
 * with a plain {@code @Transactional}. Read-only transactions let Hibernate
 * skip dirty-checking, and make an accidental write in a query path fail loudly
 * instead of silently succeeding.
 */
@Service
@Transactional(readOnly = true)
public class DeploymentRequestServiceImpl implements DeploymentRequestService {

    private static final Logger log = LoggerFactory.getLogger(DeploymentRequestServiceImpl.class);

    private final DeploymentRequestRepository repository;
    private final DeploymentRequestMapper mapper;

    /**
     * Constructor injection — no {@code @Autowired} needed on a single
     * constructor. Preferred over field injection because it makes the
     * dependencies explicit and lets tests build the service with a plain
     * {@code new}.
     */
    public DeploymentRequestServiceImpl(DeploymentRequestRepository repository,
                                        DeploymentRequestMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Transactional
    public DeploymentRequestResponse submit(CreateDeploymentRequest request) {
        DeploymentRequest saved = repository.save(mapper.toEntity(request));

        // Log the id and the mill, never the email or message: those are
        // personal data and logs are retained far longer than they should be.
        log.info("Deployment request {} submitted by mill '{}'", saved.getId(), saved.getMillName());

        return mapper.toResponse(saved);
    }

    @Override
    public PageResponse<DeploymentRequestResponse> list(DeploymentRequestStatus status,
                                                        Pageable pageable) {
        Page<DeploymentRequest> page = (status == null)
                ? repository.findAllByOrderBySubmittedAtDesc(pageable)
                : repository.findByStatusOrderBySubmittedAtDesc(status, pageable);

        return PageResponse.from(page, mapper::toResponse);
    }

    @Override
    public DeploymentRequestResponse getById(UUID id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Deployment request", id));
    }

    /**
     * {@inheritDoc}
     *
     * <p>No explicit {@code save} call: within a transaction Hibernate tracks
     * the loaded entity and flushes the change automatically on commit.
     */
    @Override
    @Transactional
    public DeploymentRequestResponse changeStatus(UUID id, DeploymentRequestStatus newStatus) {
        DeploymentRequest request = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deployment request", id));

        DeploymentRequestStatus previous = request.getStatus();
        request.changeStatus(newStatus);

        log.info("Deployment request {} moved from {} to {}", id, previous, newStatus);

        return mapper.toResponse(request);
    }
}
