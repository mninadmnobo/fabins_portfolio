package com.fabins.repository;

import com.fabins.entity.ContactInquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Spring Data JPA repository for {@link ContactInquiry} entities.
 *
 * <p>Extending {@link JpaRepository} gives this interface full CRUD and
 * pagination support without any additional implementation code. Spring Data
 * generates the proxy at application startup.
 *
 * <p>No custom query methods are defined here because the current feature set
 * only needs {@link #save(Object)} (on submission) and count/list operations
 * that are not yet exposed to the public API. Add named query methods here
 * (or {@code @Query} annotations) if admin list and filter endpoints are added
 * in a future iteration.
 *
 * @see com.fabins.service.impl.ContactInquiryServiceImpl
 */
public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, UUID> {
}
